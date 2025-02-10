import { Route, Routes } from "react-router-dom";
import "./bootstrap/style.scss";
import "./index.css";
import { LayoutDefault } from "./pages/admin/Layouts/default.jsx";
import { Index } from "./pages/admin/Layouts/index.jsx";
import { AddCategory } from "./pages/admin/pages/category/add.jsx";
import { ListCategory } from "./pages/admin/pages/category/list.jsx";
import { AddQuestion } from "./pages/admin/pages/question/add.jsx";
import { ListQuestion } from "./pages/admin/pages/question/list.jsx";
import { AddTest } from "./pages/admin/pages/test/add.jsx";
import { ListTest } from "./pages/admin/pages/test/list.jsx";
import { AddUser } from "./pages/admin/pages/users/add.jsx";
import { ListUser } from "./pages/admin/pages/users/list.jsx";
import { ContentClient } from "./pages/client/ContentClient/index.jsx";
import { TestDetail } from "./pages/client/ContentClient/TestDetail/index.jsx";
import { LayoutDefaultClient } from "./pages/client/Layouts/layout.jsx";
import { Result } from "./pages/client/ResultClient/index.jsx";
import { TestClient } from "./pages/client/TestClient/index.jsx";
import { Login } from "./pages/login/index.jsx";
import { Register } from "./pages/register/index.jsx";
import { Page403 } from "./pages/Result/403.jsx";
import Page404 from "./pages/Result/404.jsx";
import { TestDetailList } from "./pages/client/ResultClient/TestDetailList/index.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<Page403 />} />
				<Route path="/admin" element={<LayoutDefault />}>
					<Route path="categories" element={<Index />}>
						<Route index={true} element={<ListCategory />} />
						<Route path="add" element={<AddCategory />} />
					</Route>
					<Route path="questions" element={<Index />}>
						<Route index={true} element={<ListQuestion />} />
						<Route path="add" element={<AddQuestion />} />
					</Route>
					<Route path="tests" element={<Index />}>
						<Route index element={<ListTest />} />
						<Route path="add" element={<AddTest />} />
					</Route>
					<Route path="users" element={<Index />}>
						<Route index element={<ListUser />} />
						<Route path="add" element={<AddUser />} />
					</Route>
				</Route>
				<Route path="/" element={<LayoutDefaultClient />}>
					<Route index path="/" element={<ContentClient />} />
					<Route path="tests/detail/:id" element={<TestDetail />} />
					<Route path="test/" element={<TestClient />} />
					<Route path="test/details/" element={<TestDetailList />} />
					<Route path="result/:id" element={<Result />} />
				</Route>
				<Route path="*" element={<Page404 />} />
			</Routes>
		</>
	);
}

export default App;
