(function () {
  const Util = {
    parseJSON(str, defaultVal = null) {
      try {
        return JSON.parse(str) || defaultVal;
      } catch (e) {
        return defaultVal;
      }
    },
    ready(callback) {
      if (document.readyState !== "loading") {
        callback();
      } else {
        document.addEventListener("DOMContentLoaded", callback);
      }
    },
    getScriptParams(name) {
      const url = new URL(document.currentScript.getAttribute("src"));
      return url;
    },
  };

  const currentParams = Util.getScriptParams();

  const APP = {
    root: document.createElement("div"),
    init() {
      this.initPasstoAI();
      this.setupMessageListener();
    },
    initPasstoAI() {
      const PasstoAI = document.createElement("div");
      this.root.id = "PasstoAI";
      this.initStyle(PasstoAI);
      PasstoAI.appendChild(this.root);
      document.body.appendChild(PasstoAI);
      this.initChat(this.root);
    },
    initStyle(root) {
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerText = `
        #PasstoAI .PasstoAI-enlarge {
            width: 50%!important;
            height: 100%!important;
            bottom: 0!important;
            right: 0 !important;
        }
        @media only screen and (max-width: 768px){
        #PasstoAI .PasstoAI-enlarge {
            width: 100%!important;
            height: 100%!important;
            right: 0 !important;
            bottom: 0!important;
        }
        }  
        #PasstoAI .PasstoAI-mask {
            position: fixed;
            z-index: 999;
            background-color: transparent;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
        }
        #PasstoAI .PasstoAI-mask .PasstoAI-content {
            width: 45px;
            height: 48px;
            box-shadow: 1px 1px 1px 4000px rgba(0,0,0,.6);
            border-radius: 50% 0 0 50%;
            position: absolute;
            right: 0;
            bottom: 38px;
            z-index: 1000;
        }
        #PasstoAI .PasstoAI-tips {
            position: fixed;
            bottom: 30px;
            right: 60px;
            padding: 22px 24px 24px;
            border-radius: 6px;
            color: #ffffff;
            font-size: 14px;
            background: #3370FF;
            z-index: 1000;
        }
        #PasstoAI .PasstoAI-tips .PasstoAI-arrow {
            position: absolute;
            background: #3370FF;
            width: 10px;
            height: 10px;
            pointer-events: none;
            transform: rotate(45deg);
            box-sizing: border-box;
            /* left  */
            right: -5px;
            bottom: 33px;
            border-left-color: transparent;
            border-bottom-color: transparent
        }
        #PasstoAI .PasstoAI-tips .PasstoAI-title {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 8px;
        }
        #PasstoAI .PasstoAI-tips .PasstoAI-button {
            text-align: right;
            margin-top: 24px;
        }
        #PasstoAI .PasstoAI-tips .PasstoAI-button button {
            border-radius: 4px;
            background: #FFF;
            padding: 3px 12px;
            color: #3370FF;
            cursor: pointer;
            outline: none;
            border: none;
        }
        #PasstoAI .PasstoAI-tips .PasstoAI-button button::after{
            border: none;
          }
        #PasstoAI .PasstoAI-tips .PasstoAI-close {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
        
        }
        #PasstoAI-chat-container {
              width: 420px;
              height: 680px;
              display:none;
            }
        @media only screen and (max-width: 768px) {
              #PasstoAI-chat-container {
                width: 100%;
                height: 70%;
                right: 0 !important;
                bottom: 0 !important;
              }
            }
            
            #PasstoAI .PasstoAI-chat-button{
              position: fixed;
              bottom: 30px;
              right: 0;
              cursor: pointer;
          }
          #PasstoAI #PasstoAI-chat-container{
              z-index:10000;position: relative;
                    border-radius: 8px;
                    border: 1px solid #ffffff;
                    background: linear-gradient(188deg, rgba(235, 241, 255, 0.20) 39.6%, rgba(231, 249, 255, 0.20) 94.3%), #EFF0F1;
                    box-shadow: 0px 4px 8px 0px rgba(31, 35, 41, 0.10);
                    position: fixed;bottom: 20px;right: 45px;overflow: hidden;
                    max-height: 720px;
                    height: 90%;
          }
          #PasstoAI #PasstoAI-chat-container.PasstoAI-enlarge{
            max-height: unset;
          }
  
          #PasstoAI #PasstoAI-chat-container .PasstoAI-operate{
          top: 18px;
          right: 10px;
          position: absolute;
          display: flex;
          align-items: center;
          }
          #PasstoAI #PasstoAI-chat-container .PasstoAI-operate .PasstoAI-chat-close{
                  margin-left:15px;
                  cursor: pointer;
          }
          #PasstoAI #PasstoAI-chat-container .PasstoAI-operate .PasstoAI-openviewport{
                  line-height:1;
                  cursor: pointer;
          }
          #PasstoAI #PasstoAI-chat-container .PasstoAI-operate .PasstoAI-closeviewport{
  
            cursor: pointer;
          }
          #PasstoAI #PasstoAI-chat-container .PasstoAI-viewportnone{
            display:none;
          }
          #PasstoAI #PasstoAI-chat-container #PasstoAI-chat{
          height:100%;
          width:100%;
          border: none;
      }
          #PasstoAI #PasstoAI-chat-container {
                      animation: appear .4s ease-in-out;
                    }
                    @keyframes appear {
                      from {
                        height: 0;;
                      }
              
                      to {
                        height: 600px;
                      }
        }`;
      root.appendChild(style);
    },
    initChat(root) {
      // 添加对话icon
      const chatButtonHtml = `<div class="PasstoAI-chat-button" ><svg style="vertical-align: middle;overflow: hidden;" width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_349_49711)">
        <path d="M8 24C8 12.9543 16.9543 4 28 4H48V44H28C16.9543 44 8 35.0457 8 24Z" fill="url(#paint0_linear_349_49711)"/>
        </g>
        <path id="svg_4" d="m35.12072,30.13714c0.0022,1.29933 -1.06368,2.3542 -2.37402,2.3542l-4.9991,0c-1.31254,0 -2.37843,-1.05487 -2.37843,-2.3542l9.75155,0zm-0.81043,-14.08778c2.69335,0 4.88018,2.10755 4.88018,4.69739l0,0.10791c0.43385,-0.12553 0.8787,0.12552 1.00643,0.54616c0.01762,0.06827 0.02863,0.14535 0.02863,0.22463l0,3.09636l0.00661,0c0,0.45146 -0.36557,0.79942 -0.80602,0.81263c-0.11011,0 -0.20481,-0.01762 -0.30611,-0.05946c-0.3964,2.20665 -2.39605,3.88476 -4.8031,3.88476l-8.12629,0c-2.41587,0 -4.42872,-1.70013 -4.81191,-3.9156c-0.44265,0.03964 -0.83906,-0.2951 -0.87869,-0.73335l0,-3.16463c0,-0.43825 0.36557,-0.79942 0.80602,-0.79942c0,-2.59865 2.17802,-4.69739 4.88018,-4.69739l8.12409,0l-0.00002,0.00001zm0.01321,1.95339l-8.1329,0c-1.568,0 -2.8387,1.23106 -2.8387,2.744l0,3.9156c0,1.51295 1.2707,2.744 2.84751,2.744l8.12409,0c1.568,0 2.84751,-1.23105 2.84751,-2.744l0,-3.9156c0.00441,-1.51515 -1.26629,-2.744 -2.84751,-2.744zm-1.23105,1.96001c0.66948,0 1.22225,0.53735 1.22225,1.20903l0,2.09874c0.02202,0.66728 -0.51092,1.22445 -1.1804,1.24427c-0.66948,0.01762 -1.23106,-0.50872 -1.25308,-1.1738l0,-2.17802c0,-0.66508 0.54175,-1.20022 1.21124,-1.20022l-0.00001,0zm-5.67739,0.0022c0.66948,0 1.22224,0.53735 1.22224,1.20903l0,2.09874c0,0.66288 -0.54175,1.20903 -1.22224,1.20903c-0.66948,0 -1.22225,-0.53735 -1.22225,-1.20903l0,-2.10755c0,-0.66288 0.54175,-1.20023 1.22225,-1.20023l0,0.00001zm0,0" fill-rule="nonzero" fill="rgb(100%,100%,100%)" stroke="null"/>
        <defs>
        <filter id="filter0_d_349_49711" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.372549 0 0 0 0 0.85098 0 0 0 0.24 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_349_49711"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_349_49711" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_349_49711" x1="48" y1="25.6667" x2="8" y2="25.6667" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9258F7"/>
        <stop offset="1" stop-color="#3370FF"/>
        </linearGradient>
        </defs>
        </svg>
        </div>`;
      const getChatContainerHtml = () => {
        const { origin } = currentParams;
        const token = currentParams.searchParams.get("token");
        return `<div id="PasstoAI-chat-container">
          <iframe id="PasstoAI-chat" name="passtoAI-chat" allow="clipboard-write" src=${origin}/chat?id=${token}></iframe>
          </div>
          `;
      };
      root.insertAdjacentHTML("beforeend", chatButtonHtml);
      // 添加对话框
      root.insertAdjacentHTML("beforeend", getChatContainerHtml());
      // 按钮元素
      const chat_button = root.querySelector(".PasstoAI-chat-button");
      chat_button.onclick = () => {
        this.toggle();
      };
    },
    toggle() {
      const chat_container = this.root.querySelector(
        "#PasstoAI-chat-container"
      );
      chat_container.style["display"] =
        chat_container.style["display"] == "block" ? "none" : "block";
    },
    viewport() {
      const chat_container = this.root.querySelector(
        "#PasstoAI-chat-container"
      );
      if (chat_container.classList.contains("PasstoAI-enlarge")) {
        chat_container.classList.remove("PasstoAI-enlarge");
      } else {
        chat_container.classList.add("PasstoAI-enlarge");
      }
    },
    show() {
      const chat_container = this.root.querySelector(
        "#PasstoAI-chat-container"
      );
      chat_container.style["display"] = "block";
    },
    hide() {
      const chat_container = this.root.querySelector(
        "#PasstoAI-chat-container"
      );
      chat_container.style["display"] = "none";
    },
    setLanguage(val) {
      this.postMessage("setLanguage", val);
    },
    setToken(val) {
      this.postMessage("setToken", val);
    },
    setupMessageListener() {
      window.addEventListener("message", this.listenMessage.bind(this));
    },
    removeMessageListener() {
      window.removeEventListener("message", this.listenMessage.bind(this));
    },
    postMessage(type, data) {
      document
        .getElementById("PasstoAI-chat")
        .contentWindow.postMessage(
          JSON.stringify({ type: "passtoai-" + type, data }),
          "*"
        );
    },
    listenMessage(evt) {
      const e = Util.parseJSON(evt.data, { type: "" });
      // 初始化内容
      if (e.type === "passtoai-init") {
        if (window.PassToAI?.q?.length) {
          window.PassToAI?.q.forEach((element) => {
            const a = [...element];
            if (a[0] && a[0] !== "setLanguage" && APP[a[0]]) {
              APP[a[0]](...a.slice(1));
            }
          });
        }
        this.init_passtoai();
      } else if (e.type === "passtoai-getData") {
        this.postMessage("getData", window.PassToAI?.q || null);
      } else if (e.type === "passtoai-operates") {
        if (e?.data === "close") {
          this.hide();
        } else if (e?.data === "enlarge") {
          this.viewport();
        } else if (e?.data === "mini") {
          this.viewport();
        }
      }
    },
    init_passtoai() {
      const passtoai_init = function (self) {
        return (...t) => {
          const s = {
            config: {
              lang: "",
            },
            show() {
              self.show();
            },
            hide() {
              self.hide();
            },
            setLanguage(v) {
              self.setLanguage(v);
            },
            setToken(v) {
              self.setToken(v);
            },
          };
          const r = t[0];
          if (!r || !s[r]) return;
          s[r](...t.slice(1));
        };
      };
      window.PassToAI = passtoai_init(this);
    },
  };

  Util.ready(() => {
    APP.init();
  });
})();
