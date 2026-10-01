import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import styles from "./Style.module.css";
import { useSelector } from "react-redux";

const GoogleCaptchaComponent = forwardRef(
  ({ siteKey, isVisible = true }, ref) => {
    const widgetId = useRef(null);
    const scriptLoaded = useRef(false);

    const authState = useSelector((state) => state.auth);

    useEffect(() => {
      const loadScript = () => {
        if (!window.grecaptcha && !scriptLoaded.current) {
          const script = document.createElement("script");
          script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            scriptLoaded.current = true;
          };
          document.head.appendChild(script);
        }
      };

      loadScript();
    }, [siteKey]);

    useImperativeHandle(ref, () => ({
      execute: async (action = "login") => {
        return new Promise((resolve) => {
          if (window.grecaptcha && window.grecaptcha.ready) {
            window.grecaptcha.ready(() => {
              window.grecaptcha
                .execute(siteKey, { action })
                .then((token) => resolve(token))
                .catch(() => resolve(null));
            });
          } else {
            resolve(null);
          }
        });
      },
      resetCaptcha: () => {
        if (window.grecaptcha && window.grecaptcha.reset) {
          try {
            if (widgetId.current !== null) {
              window.grecaptcha.reset(widgetId.current);
            }
          } catch (error) {
            console.error("Error resetting captcha:", error);
          }
        }
      },
    }));

    return (
      <div className={styles.captchaWrap}>
        <div className={styles.captchaInfo}></div>
      </div>
    );
  }
);

export default GoogleCaptchaComponent;
