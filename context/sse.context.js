import ReactDOMServer from "react-dom/server";
import { AppContext } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import { createServerContext } from "use-sse";
import { GET_BRANDS_MINIFIED } from "../redux/endpoints";

export const { ServerDataContext, resolveData } = createServerContext();

function getOrCreate() {
  if (process.browser) {
    window._initialDataContext = window.__NEXT_DATA__.props;
    return require("use-sse").createBroswerContext();
  }
  return ServerDataContext;
}

export const Context = getOrCreate();


export async function initialRender(
  appContext,
  pageProps
) {
  const WithAppContext = appContext.AppTree;
  ReactDOMServer.renderToString(
    <Context>
      <WithAppContext {...pageProps} />
    </Context>
  );

  const sse = await resolveData();
  const d = await fetch(GET_BRANDS_MINIFIED)
  const brands = await d.json()
    sse["data"] = {...sse["data"], brands }
  return sse;
}