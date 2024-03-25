import Main from "@/components/main/main";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/store";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Provider store={store}>
            <Main/>
        </Provider>
    </BrowserRouter>

    , rootElement);
