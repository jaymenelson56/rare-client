import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { searchPosts } from "../../managers/PostManager"

export const PostSearch = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  const query = searchParams.get("q") || ""
  const author = searchParams.get("author") || ""

  const titleRef = useRef(null)
  const authorRef = useRef(null)

  useEffect(() => {
    if (titleRef.current) titleRef.current.value = query
    if (authorRef.current) authorRef.current.value = author
  }, [query, author])

  useEffect(() => {
    if (query || author) {
      searchPosts(query, author).then(setPosts)
    } else {
      setPosts([])
    }
  }, [query, author])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    const q = titleRef.current?.value.trim()
    const a = authorRef.current?.value.trim()
    if (q) params.set("q", q)
    if (a) params.set("author", a)
    navigate(`/posts/search?${params.toString()}`)
  }

  const headingParts = []
  if (query) headingParts.push(`title "${query}"`)
  if (author) headingParts.push(`author "${author}"`)
  const heading = headingParts.length ? headingParts.join(" + ") : "all"

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearch} className="mb-5">
        <div className="field is-grouped">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Search by title..."
              ref={titleRef}
              defaultValue={query}
            />
          </div>
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Filter by author username..."
              ref={authorRef}
              defaultValue={author}
            />
          </div>
          <div className="control">
            <button className="button is-link" type="submit">Search</button>
          </div>
        </div>
      </form>

      <h2 className="title is-4">Search results for {heading}</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                <td><Link to={`/profiles/${post.user.id}`}>{post.user.username}</Link></td>
                <td>{post.publication_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
