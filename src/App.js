import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";

function App() {
  return <Container>
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary">Add Budget</Button>
      <Button variant="outline-style">Add Expense</Button>
    </Stack>
    <div style={{ display: "grid",gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1rem",
    alignItems: "flex-start",
    }}>

    <BudgetCard name="Entertainment" gray amount={723} max={5000}></BudgetCard>
    </div>
  </Container>
}

export default App;
