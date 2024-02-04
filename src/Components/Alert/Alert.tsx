/* Ricardo Feregrino Ochoa 2022 (Jekuari)
 * https://github.com/jekuari
 * https://www.linkedin.com/in/ricardo-feregrino/ */
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  forwardRef,
} from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";

interface AlertContents {
  title: string;
  icon: React.FunctionComponent<any>;
  iconBackground: string;
  textColor: string;
  background: string;
}

export const AlertContext = createContext({
  active: false,
  content: {
    title: "Success!",
    icon: FiCheckCircle,
    iconBackground: "bg-green-500",
    textColor: "text-green-500",
    background: "bg-white",
  },
  setActive: () => {},
  setAlertContent: () => {},
  close: () => {},
  open: () => {},
  error: () => {},
  warning: () => {},
  success: () => {},
} as {
  active: boolean;
  content: {
    title?: string;
    icon?: React.FunctionComponent<any>;
    iconBackground?: string;
    textColor?: string;
    background?: string;
  };
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertContent: React.Dispatch<React.SetStateAction<AlertContents>>;
  close: () => void;
  open: (
    content:
      | {
          title?: string;
          icon?: React.FunctionComponent<any>;
          iconBackground?: string;
          textColor?: string;
        }
      | string
  ) => void;
  error: (
    content:
      | {
          title: string;
          icon?: React.FunctionComponent<any>;
          background?: string;
        }
      | string
  ) => void;
  warning: (
    content:
      | {
          title: string;
          icon?: React.FunctionComponent<any>;
          background?: string;
        }
      | string
  ) => void;
  success: (
    content:
      | {
          title: string;
          icon?: React.FunctionComponent<any>;
          background?: string;
        }
      | string
  ) => void;
});

const Alert = ({ contents }: { contents: AlertContents }) => {
  return <Alert.Contents contents={contents} />;
};

Alert.Provider = ({ children }: { children: React.ReactNode }) => {
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<{
    title: string;
    icon: React.FunctionComponent<any>;
    iconBackground: string;
    textColor: string;
    background: string;
  }>({
    title: "Success!",
    icon: FiCheckCircle,
    iconBackground: "bg-green-500",
    textColor: "text-green-500",
    background: "bg-white",
  });

  const close = () => {
    setAlertActive(false);
    setAlertContent({
      title: "",
      icon: FiCheckCircle,
      iconBackground: "bg-green-500",
      textColor: "text-green-500",
      background: "bg-white",
    });
  };

  const open = (
    content:
      | {
          title?: string;
          icon?: React.FunctionComponent<any>;
          iconBackground?: string;
          textColor?: string;
        }
      | string
  ) => {
    if (typeof content === "string") {
      setAlertActive(true);
      setAlertContent({
        title: content,
        icon: FiCheckCircle,
        iconBackground: "bg-green-500",
        textColor: "text-green-500",
        background: "bg-white",
      });
      return;
    }
    setAlertActive(true);
    setAlertContent((prev) => {
      return { ...prev, ...content };
    });
  };

  const error = (
    content:
      | {
          title: string;
          icon?: React.FunctionComponent<any>;
          background?: string;
        }
      | string
  ) => {
    if (typeof content === "string") {
      setAlertActive(true);

      setAlertContent({
        title: content,
        icon: FiXCircle,
        iconBackground: "bg-red-500",
        textColor: "text-red-500",
        background: "bg-red-100",
      });
      return;
    }

    setAlertActive(true);
    setAlertContent({
      title: content.title,
      icon: content.icon || FiXCircle,
      iconBackground: "bg-red-500",
      textColor: "text-red-500",
      background: content.background || "bg-red-100",
    });
  };

  const warning = (
    content:
      | {
          title: string;
          icon?: React.FunctionComponent<any>;
          background?: string;
        }
      | string
  ) => {
    if (typeof content === "string") {
      setAlertActive(true);
      setAlertContent({
        title: content,
        icon: FiInfo,
        iconBackground: "bg-yellow-500",
        textColor: "text-yellow-500",
        background: "bg-yellow-100",
      });
      return;
    }
    setAlertActive(true);
    setAlertContent({
      title: content.title,
      icon: content.icon || FiInfo,
      iconBackground: "bg-yellow-500",
      textColor: "text-yellow-500",
      background: content.background || "bg-yellow-100",
    });
  };

  const success = (
    content:
      | {
          title: string;
          icon?: React.FunctionComponent<any>;
          background?: string;
        }
      | string
  ) => {
    if (typeof content === "string") {
      setAlertActive(true);
      setAlertContent({
        title: content,
        icon: FiCheckCircle,
        iconBackground: "bg-green-500",
        textColor: "text-green-500",
        background: "bg-lime-100",
      });
      return;
    }
    setAlertActive(true);
    setAlertContent({
      title: content.title,
      icon: content.icon || FiCheckCircle,
      iconBackground: "bg-green-500",
      textColor: "text-green-500",
      background: content.background || "bg-lime-100",
    });
  };

  return (
    <AlertContext.Provider
      value={{
        active: alertActive,
        content: alertContent,
        setActive: setAlertActive,
        setAlertContent: setAlertContent,
        close: close,
        open: open,
        error: error,
        warning: warning,
        success: success,
      }}
    >
      {children}
      <AnimatePresence mode="wait">
        {alertActive && (
          <Alert.Contents contents={alertContent}></Alert.Contents>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
};

Alert.Contents = ({
  contents,
}: {
  contents: {
    title: string;
    icon: React.FunctionComponent<any>;
    iconBackground: string;
    textColor: string;
    background: string;
  };
}) => {
  const alertContext = useContext(AlertContext);

  const [scope, animate] = useAnimate();

  const Icon = forwardRef((props: any, ref) => {
    return <contents.icon {...props} ref={ref} />;
  });

  useEffect(() => {
    const enterAnimation = async () => {
      await animate("path", { pathLength: 0 }, { duration: 0 });
      await animate(
        "polyline",
        { pathLength: 0, pathOffset: 1 },
        { duration: 0 }
      );
      await animate("path", { pathLength: 1 }, { duration: 0.4 });
      await animate(
        "polyline",
        { pathLength: 1, pathOffset: 0 },
        { duration: 0.4 }
      );
    };

    window.setTimeout(() => {
      enterAnimation();
    }, 200);
  }, []);

  useEffect(() => {
    let timeout: number;

    if (alertContext.active) {
      timeout = window.setTimeout(() => {
        alertContext.close();
      }, 3000);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [alertContext.active]);

  return (
    <motion.div
      className={`flex h-16 w-max items-center justify-start ${
        contents.background || "bg-white"
      } fixed left-1/2 top-4 z-[250] flex-shrink-0 flex-grow-0 gap-4 rounded-full px-2`}
      initial={{ y: "-200%", scaleX: 0 }}
      animate={{ y: "0%", scaleX: 1 }}
      exit={{ y: "-200%", scaleX: 0 }}
      style={{
        translateX: "-50%",
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.5}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.y) > 50) {
          alertContext.close();
        }
      }}
      onClick={() => {
        alertContext.close();
      }}
    >
      <div
        ref={scope}
        className={`h-12 w-12 rounded-full ${contents.iconBackground} p-3 `}
      >
        <Icon className="h-full w-full text-white" style={{ pathLength: 0 }} />
      </div>
      <div className="overflow-hidden pr-4">
        <motion.p
          className={`sm:text-xl ${contents.textColor} `}
          initial={{ x: "-200%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.4 }}
        >
          {contents.title}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Alert;

export const useAlert = () => {
  const alertContext = useContext(AlertContext);

  return alertContext;
};
