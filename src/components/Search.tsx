import { OutlinedInput } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchValue = searchParams.get("search");

    if (!searchValue) {
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      setSearchParams(params);
    }
  }, [searchParams, setSearchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = new URLSearchParams(searchParams);
    param.set("search", event.target.value);

    setSearchParams(param, { replace: true });
  };

  return (
    <form id="search-form" action="#" method="post">
      <OutlinedInput
        size="small"
        type="search"
        name="search"
        id="search-input"
        sx={{
          bgcolor: "#fff8",
          width: 240,
          transition: ({ transitions }) =>
            transitions.create(["width", "background-color"], {
              easing: transitions.easing.easeOut,
              duration: transitions.duration.shortest
            }),
          "&:hover, &:focus-within": {
            bgcolor: "#fffb"
          },
          "&:focus-within": {
            width: 300
          }
        }}
        onChange={handleChange}
        inputProps={{
          "aria-label": "Search for activities",
          placeholder: "Search for activities"
        }}
        value={searchParams.get("search") || ""}
      />
    </form>
  );
};
