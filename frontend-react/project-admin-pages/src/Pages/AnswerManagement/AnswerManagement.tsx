import React, { useState, useEffect, ChangeEvent } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Autocomplete, Box, Input, TextField } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  createDataWithImage,
  deleteData,
  getDataPaginatiton,
} from "../../apis/API";
// import QuestionModal from "./QuestionModal";
import { I_Question, I_Answer } from "../../types/form.type";
import { useTheme } from "@mui/material/styles";
import {
  GET_ANSWER,
  GET_QUESTION,
  IMPORT_CSV_ANSWER,
  SOFT_DELETE_ANSWER,
} from "../../apis/common";
// import DeletedQuestion from "./DeleteQuestion";

function AnswerManagement() {
  const theme = useTheme();
  const [questions, setQuestions] = useState<I_Question[]>([]);
  const [answers, setAnswers] = useState<I_Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<I_Answer | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTermQuestion, setSearchTermQuestion] = useState<
    string | undefined
  >(""); // State để lưu trữ từ khóa tìm kiếm
  const [showTrash, setShowTrash] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFile, setSelectedFile] = useState({});
  const [valueOptionQuestion, setValueOptionQuestion] = useState<
    I_Question | undefined
  >();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã câu hỏi",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "answer_text",
      headerName: "Nội dung câu trả lời",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "question",
      headerName: "Câu hỏi",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        const answerId = params.row.id;
        const answer = answers.find((c) => c.id === answerId);
        if (answer) {
          const questionIds = answer.question_id;
          const questionFilter = questions.filter(
            (quesion) => questionIds == quesion.id
          );
          const questionNames = questionFilter.map(
            (quesion) => quesion.question_text
          );
          return questionNames.join(", ");
        }
        return "";
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => handleViewDetails(params.row.id)}
            variant="contained"
            style={{
              backgroundColor: "blue",
              color: "white",
              cursor: "pointer",
            }}
          >
            Xem
          </Button>
          <Button
            onClick={() => handleOpenEdit(params.row.id)}
            variant="contained"
            color="primary"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)}
            variant="contained"
            color="secondary"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
  }, [page, pageSize, totalPages, searchTermQuestion]);

  async function fetchAnswers() {
    const getAnswers = await getDataPaginatiton(GET_ANSWER, {
      question_id: searchTermQuestion,
      page: page,
      pageSize: pageSize,
    });
    
    setTotalPages(getAnswers?.total);
    setAnswers(getAnswers?.data);
    setSelectedAnswer(getAnswers?.data);
  }

  async function fetchQuestions() {
    const getQuestions = await getDataPaginatiton(GET_QUESTION, {
      courses_id: "",
      lesson_id: "",
      page: 1,
      pageSize: 100,
    });

    setQuestions(getQuestions.data);
  }

  const handle = (a: any) => {
    setPage(a.page + 1);
    setPageSize(a.pageSize);
  };

  const handleSearch = () => {
    console.log(1111,valueOptionQuestion);
    
    const question_id = valueOptionQuestion?.id;

    setSearchTermQuestion(question_id || "");
  };

  const toggleView = () => {
    setShowTrash((prevShowTrash) => !prevShowTrash);
    fetchAnswers();
  };

  const handleOpenEdit = async (id: string) => {
    const answer = answers.find((answer) => answer.id === id);
    setAction("edit");
    setSelectedAnswer(answer || null);
    setModalOpen(true);
  };

  const handleAddModal = async () => {
    setModalOpen(true);
    setAction("add");
  };

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedAnswer(null);
    setAction("");
  };

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmation) {
      await deleteData(SOFT_DELETE_ANSWER, id);
      fetchAnswers();
    }
  };

  const handleViewDetails = (id: string) => {
    const answer = answers.find((answer) => answer.id === id);
    if (answer) {
      setAction("view");
      setSelectedAnswer(answer);
      setModalOpen(true);
    }
  };

  const handleAddCSVFile = async () => {
    await createDataWithImage(IMPORT_CSV_ANSWER, selectedFile);
    fetchAnswers();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      setSelectedFile({ [name]: files[0] });
    }
  };

  const handleSelectChangeCourse = (id: string) => {
    const questionOption = questions?.find((item) => item.id == id);    
    if (questionOption) {
      return setValueOptionQuestion(questionOption);
    }
    setValueOptionQuestion(undefined);
  };

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SlideBar />
        {/* <Grid container spacing={2}> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>
            Quản lý câu trả lờ<i></i>
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "160px",
              marginBottom: "10px",
            }}
          >
         <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCSVFile}
            >
              Import CSV
            </Button>
            <Input
              type="file"
              id="file_csv"
              name="file_csv"
              onChange={handleInputChange}
              style={{ width: "300px" }}
            />
          </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                id="courses_id"
                options={questions}
                // value={valueOptionQuestion}
                onInputChange={(event, newValue) => {
                  handleSelectChangeCourse(newValue);
                }}
                sx={{ width: 150 }}
                getOptionLabel={(option) => option.id}
                renderInput={(params) => (
                  <TextField {...params} label="ID Câu hỏi" />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Lọc
              </Button>
            </div>
            <div
              style={{
                width: "155px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color={showTrash ? "error" : "primary"}
                onClick={toggleView}
              >
                {showTrash ? "Thùng rác" : "Dữ liệu"}
              </Button>
            </div>
          </div>
        
          <div style={{ width: "100%" }}>
            {showTrash ? (
              <DataGrid
                className="disabled-focus"
                paginationMode="server"
                rowCount={totalPages}
                onPaginationModelChange={handle}
                rows={answers}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { page: page, pageSize: pageSize },
                  },
                }}
                pageSizeOptions={[10, 15, 20, 30]}
              />
            ) : (
              //   <DeletedQuestion />
              <>AAAA</>
            )}
          </div>
        </Box>
        {/* </Grid> */}
      </Box>
      {/* <QuestionModal
        quesion={selectedQuestion}
        courses={courses}
        lessons={lessons}
        open={isModalOpen}
        onClose={hanldeClose}
        action={action}
        fetchQuestions={fetchQuestions}
      /> */}
    </>
  );
}
export default AnswerManagement;
