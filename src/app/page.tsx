"use client"
import TopHeadlines from "@/app/TopHeadlines/components/TopHeadlines";
import { Provider } from "react-redux";
import store from './store';

export default function Home() {
  return (
    <Provider store={store}>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Top Headlines</h1>

      <TopHeadlines/>
    </main>
    </Provider>
  );
}
