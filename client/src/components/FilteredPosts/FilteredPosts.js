import React, { useContext } from "react";
import { Context } from "../../context/Context";

const FilteredPosts = () => {
  const { user, isFetching, error, dispatch, filteredPosts } = useContext(Context);

  return (
    <div>
      {filteredPosts && filteredPosts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FilteredPosts;
