import { useState } from "react";

function useLocalStorage(key, defaultValue) {
    const [value,setValue] = useState(() => {
        if(jsonValue != null) return JSON.parse(jsonValue)

    })
}