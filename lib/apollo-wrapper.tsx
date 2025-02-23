"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import React from "react";
import { mockDB } from "@/src/mock/db";
import { Observable } from '@apollo/client';
import { OperationDefinitionNode, Kind } from 'graphql';

function makeClient() {
  // 실제 HTTP 링크 (나중에 사용)
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_EXTERNAL_BACKEND_GRAPHQL_URL}`,
    fetchOptions: { cache: "no-store" },
  });

  // 목업 데이터를 위한 링크
  const mockLink = new ApolloLink((operation) => {
    return new Observable((observer) => {
      const { query } = operation;
      
      const operationDef = query.definitions.find(
        (def): def is OperationDefinitionNode => def.kind === Kind.OPERATION_DEFINITION
      );

      if (operationDef?.operation === 'query') {
        const queryName = operationDef.selectionSet.selections[0]?.kind === Kind.FIELD
          ? operationDef.selectionSet.selections[0].name.value
          : null;

        switch(queryName) {
          case 'getGames':
            observer.next({
              data: {
                getGames: mockDB.getAllGames()
              }
            });
            break;
          case 'getGameDetail':
            const id = operation.variables?.id;
            observer.next({
              data: {
                getGameDetail: mockDB.getGameById(id)
              }
            });
            break;
          case 'getGameComments':
            const gameId = operation.variables?.gameId;
            observer.next({
              data: {
                getGameComments: mockDB.getGameComments(gameId)
              }
            });
            break;
        }
      }
      
      observer.complete();
    });
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: mockLink, // 목업 링크 사용
    // 실제 API 준비되면 아래 코드로 교체
    // link:
    //   typeof window === "undefined"
    //     ? ApolloLink.from([
    //         new SSRMultipartLink({
    //           stripDefer: true,
    //         }),
    //         httpLink,
    //       ])
    //     : httpLink,
  });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
