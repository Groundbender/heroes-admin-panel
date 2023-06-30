import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//createApi создает еще и reducer
export const apiSlice = createApi({
  // необязательное поле (api подставился бы по умолчанию)
  reducerPath: "api",
  //обязательное поле
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  // ф-ия по тегу работает только с Heroes
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    //useGetHeroesQuery
    getHeroes: builder.query({
      query: () => "/heroes",
      providesTags: ["Heroes"], // когда query происходит это относится к Heroes
    }),
    // useCreateHeroMutation
    createHero: builder.mutation({
      query: (hero) => ({
        url: "/heroes",
        method: "POST",
        body: hero,
      }),
      // если мы мутировали данныe, получаем данные по актуальной метке Heroes (mutation -> query)
      invalidatesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      // если мы мутировали данныe, получаем данные по актуальной метке Heroes (mutation -> query)
      invalidatesTags: ["Heroes"],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
} = apiSlice;
