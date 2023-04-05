import "./style.css";
import { Component, useEffect, useState } from "react";

import { TextInput } from "../../TextInput";
import { Posts } from "../../Posts";
import { loadPosts } from "../../../utils/loadPosts/loadPosts";
import { Button } from "../../Button";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerpage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerpage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  useEffect(() => {
    handleLoadPosts();
  }, []);
  const handleLoadPosts = async () => {
    const postAndPhoto = await loadPosts();
    // colocando a união das api no state

    setPosts(postAndPhoto.slice(page, postsPerpage));
    setAllPosts(postAndPhoto);
  };

  const loadMorePosts = () => {
    const nextPages = page + postsPerpage;
    const nextPosts = allPosts.slice(nextPages, nextPages + postsPerpage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPages);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <TextInput searchValue={searchValue} handleChange={handleChange} />

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <h3>Nenhum Post encontrado =(</h3>}

      {!searchValue && (
        <div className="button-container">
          <Button
            text={"carregar mais posts"}
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      )}
    </section>
  );
};

export default Home;
