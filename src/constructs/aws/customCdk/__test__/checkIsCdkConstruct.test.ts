import { Construct as CdkConstruct } from "constructs";
import { checkIsCdkConstruct } from "../checkIsCdkConstruct";

const mockScope = null;
const mockId = null;
const mockConstruct = new CdkConstruct(mockScope, mockId);

describe("checkIsCdkConstruct", () => {
    it("should return true if provided with a CdkConstruct", () => {
        expect(checkIsCdkConstruct(mockConstruct)).toBeTruthy;
    });
});
