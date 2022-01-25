import styles from "./App.module.scss";
import AllProductsPage from "./pages/AllProductsPage";

function App() {
  return (
    <div>
      <main className={styles.main}>
        <AllProductsPage />
      </main>
    </div>
  );
}

export default App;
