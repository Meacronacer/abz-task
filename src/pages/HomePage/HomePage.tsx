import root from "./homePage.module.scss";
import Form from "../../components/form/form";
import ContentTop from "../../components/contentTop/contentTop";
import Header from "../../components/header/header";
import Users from "../../components/users/users";
import { useState } from "react";
import NewUserCreated from "../../components/newUserCreated/newUserCreated";
import { useGetUsersQuery } from "../../redux/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const HomePage = () => {
  const [newUserCreated, setNewUserCreated] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.page);
  const { data = [], isLoading, refetch } = useGetUsersQuery({ page });

  return (
    <>
      <Header />
      <div className={root.homePage}>
        <ContentTop />
        <Users
          data={data}
          dispatch={dispatch}
          isLoading={isLoading}
          page={page}
        />
        {newUserCreated ? (
          <NewUserCreated setNewUserCreated={setNewUserCreated} />
        ) : (
          <Form
            dispatch={dispatch}
            page={page}
            refetch={refetch}
            setNewUserCreated={setNewUserCreated}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
