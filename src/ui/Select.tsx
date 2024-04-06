import styled from "styled-components";
interface Props {
  type?: string;
}
const StyledSelect = styled.select<Props>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface PropsOption {
  value: string;
  label: string;
}
interface SelectProps {
  options: PropsOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type SelectCompProps = SelectProps & {
  type?: string;
};
export default function Select({
  options,
  value,
  onChange,
  ...props
}: SelectCompProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
