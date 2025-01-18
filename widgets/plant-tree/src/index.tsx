import React from "react";
import ReactDOM from "react-dom/client";

declare global {
  interface Window {
    Widget?: {
      mount: (selector: string, widgetName: string, props: any) => void;
    };
  }
}

window.Widget = window.Widget || {
  mount: (selector: string, widgetName: string, props: any) => {
    console.log(`🔹 mounting widget: ${widgetName} to ${selector}`);

    const container = document.querySelector(selector);
    if (!container) {
      console.error(`❌ could not find element: ${selector}`);
      return;
    }

    const scriptUrl = `https://d1wakbm2x7tbyr.cloudfront.net/widgets/${widgetName}.js?v=${new Date().getTime()}`;
    console.log("📜 loading script:", scriptUrl);

    // check if the script is already loaded
    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
      console.warn(`⚠️ script already loaded: ${scriptUrl}`);
      checkAndRenderWidget(widgetName, container, props);
      return;
    }

    // dynamically load the widget script
    const widgetScript = document.createElement("script");
    widgetScript.src = scriptUrl;

    widgetScript.onload = () => {
      console.log(`✅ widget script loaded: ${widgetName}`);
      checkAndRenderWidget(widgetName, container, props);
    };

    widgetScript.onerror = () => {
      console.error(`❌ failed to load widget script: ${widgetName}`);
    };

    document.head.appendChild(widgetScript);
  },
};

// just a utility function to check if widget is available before rendering
function checkAndRenderWidget(
  widgetName: string,
  container: Element,
  props: any
) {
  const checkInterval = setInterval(() => {
    if (window[widgetName]) {
      clearInterval(checkInterval);
      console.log(`✅ found widget on window: ${widgetName}`);

      const WidgetComponent = window[widgetName];
      const root = ReactDOM.createRoot(container);
      console.log({ WidgetComponent, props });
      root.render(<WidgetComponent {...props} />);
    } else {
      console.warn(`⏳ waiting for widget ${widgetName} to be available...`);
    }
  }, 100);

  // stop checking after 5 seconds to prevent infinite loop 'cause ew yucky
  setTimeout(() => clearInterval(checkInterval), 5000);
}
