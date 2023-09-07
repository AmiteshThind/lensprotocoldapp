import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import omitDeep from "omit-deep";
import { Eip712TypedDataDomain } from "../graphql/generated";
import { ethers } from "ethers";

//1.sign typed data with ommitted __typename values using omit-deep
export function omitTypename(object: any) {
  return omitDeep(object, ["__typename"]);
}

export async function signTypedDataWithOmittedTypename(
  sdk: any,
  domain: Eip712TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>
) {
  //perform signing with sdk
  return await sdk.wallet.signTypedData(
    omitTypename(domain) as Eip712TypedDataDomain,
    omitTypename(types) as Record<string, any>,
    omitTypename(value) as Record<string, any>
  );
}

export function splitSignature(signature: string) {
  return ethers.utils.splitSignature(signature);
}

//2. split the signare to extract v,r,s values to pass into signature
