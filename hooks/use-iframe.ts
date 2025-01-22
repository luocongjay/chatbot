import * as React from "react";

export function useIsIframe() {
  const [isIframe, setIsIframe] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  return !!isIframe;
}
