import {useContext, useEffect, useState } from "react";
import PageLayout from "../../components/Common/PageLayout";
import { askQuestion } from "../../queries/ai";
import { UserContext } from "../../context/UserContext";
import { Button, Divider, TextField } from "@mui/material";

const TipsPage: React.FC = () => {
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const {connectedUser } = useContext(UserContext);

  const fetchAiData = async (userquestion?: string) => {
    try {
      const accessToken = connectedUser?.accessToken;

      if (!accessToken) {
        console.log("No access token found");
        return;
      }

      const aiResponse = await askQuestion({question: userquestion ? userquestion : 'What is the best food for weight loss?'}, accessToken);

      if (aiResponse.status === 200) {
        console.log("Query success");
        setAiResponse(aiResponse.data);
      }
    } catch (error) {
        console.log("error: ", error);
    } 
  };

  // useEffect(() => {
  //   fetchAiData();
  // }, []);

  return (
    <PageLayout>
      <div style={{ width: "80%", display:"flex", flexDirection: "column"}}>
          <Button
            fullWidth
            variant='contained'
            sx={{ my: 3 }} 
            onClick={() => fetchAiData("")}>
              Click here to generate a tip
          </Button>
          <Divider sx={{ backgroundColor: "gray", width: "90%", justifySelf: "center" }} />
          <TextField
            fullWidth
            multiline
            rows={3}
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder='Type your question here'
            variant='outlined'/>
            <Button
            variant='outlined'
            sx={{ my: 3 }} 
            onClick={() => fetchAiData(userQuestion)}>
              Ask your question
            </Button>
            <p>
              <h5>{aiResponse}</h5> 
            </p>
      </div>
    </PageLayout>
  );
};

export default TipsPage;
