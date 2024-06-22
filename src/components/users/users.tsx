import Item, { Iuser } from "./item/item";
import root from "./users.module.scss";
import { ClipLoader } from "react-spinners";
import { setPage } from "../../redux/slices/pageSlice";
import { Dispatch } from "react";

interface props {
  data: any;
  dispatch: Dispatch<{ type: string; payload: number }>;
  isLoading: boolean;
  page: number;
}

const Users: React.FC<props> = ({ data, dispatch, isLoading, page }) => {
  const usersData = data?.users?.map((item: Iuser) => (
    <Item key={item.id} {...item} />
  ));

  return (
    <div className={root.users}>
      <h1 className={root.title}>Working with GET request</h1>

      {isLoading ? (
        <div className="spinner">
          <ClipLoader color="#36d7b7" size={500} />
        </div>
      ) : (
        <div className={root.itemsList}>{usersData}</div>
      )}

      {data?.total_pages > page && (
        <button
          disabled={isLoading}
          onClick={() => dispatch(setPage(page + 1))}
          className={root.showMore}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default Users;
