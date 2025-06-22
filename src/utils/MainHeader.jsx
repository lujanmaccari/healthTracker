import { useState, useRef, useEffect } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { COLORS } from "../constants/colors";

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 10vw;
  width: 1900px;
  position: sticky;
  top: 0;
  z-index: 10;
  max-width: 100%;
  background-color: ${COLORS.MAIN_BG};
  box-shadow: 0 4px 10px -4px #eee;
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
      background-color: ${COLORS.MAIN};
      color: ${COLORS.SECONDARY_BG};
      outline: none;
    }
  }
`;

const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  gap: 0.5rem;

  span {
    color: ${COLORS.DARK_TEXT};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  height: 5vh;
  ${({ color }) => color && `color:${color};`}
  ${({ isSelectable }) => isSelectable && `cursor: pointer;`}
`;

export const DropdownMenu = ({ isOpen, setOpen, options, parentRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const applicableRef = parentRef || containerRef;
      if (
        applicableRef.current &&
        !applicableRef.current.contains(event.target)
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
  }, [setOpen, parentRef]);

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
  const menuRef = useRef(null);
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
    setDropdownMenuOpen((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <div ref={menuRef} className="position-relative d-inline-block">
        <div onClick={openDropdownMenu}>
          <StyledIcon icon={faBars} color={COLORS.MAIN} isSelectable />
        </div>
        <DropdownMenu
          isOpen={isDropdownMenuOpen}
          setOpen={setDropdownMenuOpen}
          options={menuItems}
          parentRef={menuRef}
        />
      </div>
      <h3>{title}</h3>

      <UserItemContainer>
        <span>{name}</span>
        <StyledIcon icon={faUserCircle} color={COLORS.SECONDARY} />
      </UserItemContainer>
    </HeaderContainer>
  );
};

export default MainHeader;
