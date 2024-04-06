import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutSideClick } from "../hooks/useOutSideClick";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;
interface Props {
  position: {
    x: number;
    y: number;
  };
}
const StyledList = styled.ul<Props>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface TypePosition {
  x: number;
  y: number;
}
interface TypeContext {
  open: Dispatch<SetStateAction<number | string>>;
  close: () => void;
  openId: string | number;
  position: TypePosition | null;
  setPosition: Dispatch<SetStateAction<TypePosition | null>>;
}

const defaultValue = {
  open: () => "",
  close: () => "",
  openId: "",
  position: null,
  setPosition: () => null,
};
const MenusContext = createContext<TypeContext>(defaultValue);

function Menus({ children }: { children: JSX.Element }) {
  const [openId, setOpenId] = useState<number | string>("");
  const [position, setPosition] = useState<TypePosition | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  useEffect(() => {
    function handleScroll() {
      if (openId) {
        close();
        document.removeEventListener("wheel", handleScroll);
      }
    }
    if (openId) document.addEventListener("wheel", handleScroll);

    return () => document.removeEventListener("wheel", handleScroll);
  }, [openId, close]);
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const rect = (e.target as Element)
      .closest("button")!
      .getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || +openId !== +id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({
  id,
  children,
}: {
  id: number;
  children: JSX.Element[] | JSX.Element;
}) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutSideClick(
    close,
    false
  ) as React.RefObject<HTMLUListElement>;

  if (+openId !== id) return null;

  return createPortal(
    <StyledList position={position!} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: string;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
