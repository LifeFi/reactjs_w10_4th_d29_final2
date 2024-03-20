import styled from "styled-components";

const Loader = styled.div<ISpinner>`
  height: ${(props) => props.size ?? "25px"};
  width: ${(props) => props.size ?? "25px"};
  border-radius: 50%;
  border: 5px solid ${(props) => props.borderColor ?? "rgba(255,0,0,0.3)"};
  border-top: 5px solid ${(props) => props.borderTopColor ?? "red"};
  animation: spin 0.8s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface ISpinner {
  size?: string;
  borderColor?: string;
  borderTopColor?: string;
}

export default function Spinner({
  size,
  borderColor,
  borderTopColor,
}: ISpinner) {
  return (
    <Loader
      size={size}
      borderColor={borderColor}
      borderTopColor={borderTopColor}
    />
  );
}
