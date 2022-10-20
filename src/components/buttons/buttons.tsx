import React from 'react';
interface BtnRequiredProps {
  title: string;
}

interface BtnOptionalProps {
  color: string;
  variant: string;
}

interface BtnProps
  extends BtnRequiredProps,
    BtnOptionalProps {}

const defaultProps: BtnOptionalProps = {
  color: 'red',
  variant: 'filled',
};

const Button = (props: BtnProps) => {
  const { title, color, variant } = props;  
  return (
    <button className="btn">
      {props.variant}
      {props.title}
      {props.color}
    </button>
  );
};


Button.defaultProps = defaultProps;
export default Button;