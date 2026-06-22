export default function EfLoginPage() {
  return (
    <div className="p-2">
      <h1>This is login page.</h1>
      <form action="">
        <label htmlFor="">
          Username: <input type="text" className="border" />
          <br />
          Password: <input type="text" className="border" />
          <br />
          <button className="border">Login</button>
        </label>
      </form>
    </div>
  );
}
