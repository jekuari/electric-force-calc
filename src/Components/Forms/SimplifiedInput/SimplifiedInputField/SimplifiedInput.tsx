import React, { ReactNode } from "react";
import InputField, { InputFieldProps } from "../../InputField/InputField.js";
import { IconType } from "react-icons";
import { FiInfo } from "react-icons/fi";
import SimplifiedInputTemplate from "../SimplifiedInputTemplate.js";

const SimplifiedInput = ({
   moreInfo,
   inputFieldProps,
   title
}: {
   moreInfo?: ReactNode;
   inputFieldProps: InputFieldProps;
   title: string;
}) => {
   return (
      <SimplifiedInputTemplate title={title} moreInfo={moreInfo}>
         <InputField {...inputFieldProps} />
      </SimplifiedInputTemplate>
   );
};

export default SimplifiedInput;
