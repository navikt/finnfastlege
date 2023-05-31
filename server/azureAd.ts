import { RequestHandler } from 'express';
import { createRemoteJWKSet, decodeJwt, jwtVerify } from 'jose';
import { FlattenedJWSInput, GetKeyFunction, JWSHeaderParameters } from 'jose/dist/types/types';
import { Issuer, Client } from 'openid-client';
import * as Config from "./config";

let azureAdIssuer: Issuer<Client>;
let remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;
let openIdClient: OpenIdClient.Client;

export const initializeAzureAd = async () => {
    try {
        await discoverAzureAdIssuer();
        opprettRemoteJWKSet();
        opprettOpenIdClient();
    } catch (e) {
        throw Error('Klarte ikke å initialisere AzureAD:' + e);
    }
};

const discoverAzureAdIssuer = async () => {
    if (Config.auth.discoveryUrl) {
        azureAdIssuer = await Issuer.discover(Config.auth.discoveryUrl);
    } else {
        throw Error(`Miljøvariabelen "AZURE_APP_WELL_KNOWN_URL" må være definert`);
    }
};

const opprettRemoteJWKSet = () => {
    const jwksUrl = new URL(Config.auth.jwksURI);
    remoteJWKSet = createRemoteJWKSet(jwksUrl);
};

const opprettOpenIdClient = () => {
    openIdClient = await createOpenIdClient(Config.auth.issuer);
};

const createOpenIdClient = async (
  issuerUrl: string
): Promise<Client> => {
  try {
    const issuer = await Issuer.discover(issuerUrl);

    return new issuer.Client(
      {
        client_id: Config.auth.clientId,
        redirect_uris: [Config.auth.redirectUri],
        token_endpoint_auth_method: "private_key_jwt",
        token_endpoint_auth_signing_alg: "RS256",
      },
      Config.auth.jwks
    );
  } catch (e) {
    console.log("Could not discover issuer", issuerUrl);
    throw e;
  }
};

export const requestOnBehalfOfToken = async (
  token: string,
  clientId: string
) => {
  const grantBody = {
    assertion: token,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    requested_token_use: "on_behalf_of",
    scope: `api://${clientId}/.default`,
  };
  return await openIdClient.grant(grantBody);
};

export const tokenIsValid = async (token: string) => {
    try {
        const verification = await jwtVerify(token, remoteJWKSet, {
            audience: clientId,
            issuer: azureAdIssuer.metadata.issuer,
        });

        return !!verification.payload;
    } catch (e) {
        logger.error('Noe galt skjedde under validering av token:', e);
        return false;
    }
};


