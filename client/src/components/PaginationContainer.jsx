import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "@assets/wrappers/PageBtnContainer";
import { useAppContext } from "@context/appContext";

function PaginationContainer() {
  const { page, numOfPages, changePage } = useAppContext();

  const previousPage = () => {
    const newPage = page === 1 ? numOfPages : page - 1;
    changePage(newPage);
  };

  const nextPage = () => {
    const newPage = page === numOfPages ? 1 : page + 1;
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={previousPage}>
        <HiChevronDoubleLeft />
        Previous
      </button>

      <div className="btn-container">
        {page > 1 && (
          <button className="btn page-btn" onClick={previousPage}>
            {page - 1}
          </button>
        )}

        <button className="btn page-btn active">{page}</button>

        {page < numOfPages && (
          <button className="btn page-btn" onClick={nextPage}>
            {page + 1}
          </button>
        )}
      </div>

      <button className="next-btn" onClick={nextPage}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}

export default PaginationContainer;
