"use client";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import React from "react";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_EXTERNAL_BACKEND_GRAPHQL_URL}`,
    fetchOptions: { cache: "no-store" },
  });

  const wsLink = new WebSocketLink({
    uri: `${process.env.NEXT_PUBLIC_EXTERNAL_BACKEND_GRAPHQL_WS_URL}`,
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={makeClient()}>{children}</ApolloProvider>;
}
