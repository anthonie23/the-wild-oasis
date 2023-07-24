import { styled } from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1.Load the authenticated user
  const { isLoading, user, isAuthenticated } = useUser();

  // 2. if there no authenticated user navigate back to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);
  // 3. while loading show spinner which takes up the whole page
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
