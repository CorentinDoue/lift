import type { FromSchema } from "json-schema-to-ts";
import type { Construct as CdkConstruct } from "constructs";
import type { AwsProvider } from "@lift/providers";
import { AwsConstruct } from "@lift/constructs/abstracts";
import { importFile } from "./importFile";
import { checkIsCdkConstruct } from "./checkIsCdkConstruct";
import { checkConstructCanBeDeployed } from "./checkConstructCanBeDeployed";
import { getAllPublicAttributes } from "./getAllPublicAttributes";

const CUSTOM_CDK_DEFINITION = {
    type: "object",
    properties: {
        type: { const: "custom-cdk" },
        cdkConstructPath: { type: "string" },
        cdkConstructOptions: { type: "object" },
    },
    additionalProperties: false,
    required: ["cdkConstructPath"],
} as const;
type Configuration = FromSchema<typeof CUSTOM_CDK_DEFINITION>;

export class CustomCdk extends AwsConstruct {
    public static type = "custom-cdk";
    public static schema = CUSTOM_CDK_DEFINITION;

    private customCdkConstruct: CdkConstruct;

    constructor(
        scope: CdkConstruct,
        private readonly id: string,
        private readonly configuration: Configuration,
        private readonly provider: AwsProvider
    ) {
        super(scope, id);

        // dynamically import the file pointed by the path and compile it if it's a typescript file
        const cdkConstructClass = importFile(this.configuration.cdkConstructPath);

        // Imported file can contain anything. It should be validated
        checkIsCdkConstruct(cdkConstructClass);

        // The construct is only used to produce CloudFormation. It can't produce side effects such as artefacts upload.
        checkConstructCanBeDeployed(cdkConstructClass);

        this.customCdkConstruct = new cdkConstructClass(scope, "CdkConstruct", this.configuration.cdkConstructOptions);
    }
    variables(): Record<string, unknown> {
        // Expose all the public attributes of the construct
        return getAllPublicAttributes(this.customCdkConstruct);
    }
    outputs() {
        return {};
    }
}
