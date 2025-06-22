import { useState, useRef, useEffect } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const DropdownMenuContainer = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;

  li,
  li button {
    padding: 8px 12px;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: #a5b48e;
      color: #f0f0f0;
      outline: none;
    }
  }
`;

const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  gap: 0.5rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  height: 5vh;
  ${({ color }) => color && `color:${color};`}
  ${({ isSelectable }) => isSelectable && `cursor: pointer;`}
`;

export const DropdownMenu = ({ isOpen, setOpen, options }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  console.log("isOpen", isOpen);
  const closeMenu = () => setOpen(false);

  if (isOpen)
    return (
      <DropdownMenuContainer className="dropdown-menu show" ref={containerRef}>
        {options.map((o, i) => (
          <li>
            <button
              key={`option-${o.label}${i}`}
              className="dropdown-item"
              onClick={() => {
                o.onClick();
                closeMenu();
              }}
            >
              {o.label}
            </button>
          </li>
        ))}
      </DropdownMenuContainer>
    );
};

const MainHeader = ({ title }) => {
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, name } = useUser();

  const menuItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/home"),
    },
    {
      label: "Configuración de Objetivos",
      onClick: () => {},
    },
    {
      label: "Configuración de Usuario",
      onClick: () => {},
    },

    {
      label: "Cerrar Sesion",
      onClick: signOut,
    },
  ];

  const openDropdownMenu = () => {
    console.log("opening", isDropdownMenuOpen);
    setDropdownMenuOpen(true);
  };

  return (
    <HeaderContainer>
      <div className="position-relative d-inline-block">
        <div onClick={openDropdownMenu}>
          <StyledIcon icon={faBars} color="#a5b48e" isSelectable />
        </div>
        <DropdownMenu
          isOpen={isDropdownMenuOpen}
          setOpen={setDropdownMenuOpen}
          options={menuItems}
        />
      </div>
      <h3>{title}</h3>

      <UserItemContainer>
        <span>{name}</span>
        <StyledIcon icon={faUserCircle} color="#60655E" />
      </UserItemContainer>
    </HeaderContainer>
  );
};

export default MainHeader;
