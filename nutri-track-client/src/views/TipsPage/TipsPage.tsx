import {useContext, useState } from "react";
import PageLayout from "../../components/Common/PageLayout";
import { askQuestion } from "../../queries/ai";
import { UserContext } from "../../context/UserContext";
import { Button, TextField, Typography } from "@mui/material";
import TryIcon from '@mui/icons-material/Try';

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

  return (
    <PageLayout>
      <div style={{ width: "60%", display:"flex", flexDirection: "column", alignItems: "center",alignSelf: "center"}}>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder='Type your question here'
            variant='outlined'/>
            <p style={{display: "flex", flexDirection: "row"}}>
              <Button
                variant='outlined'
                sx={{ my: 3 }} 
                onClick={() => fetchAiData(userQuestion)}>
                  Ask your question
              </Button>
              <Button
                variant='contained'
                sx={{ my: 3 }} 
                onClick={() => fetchAiData("")}>
                  Click here to generate a tip
              </Button>
            </p>
            <p>
              <h3>AI Answer:</h3>
              <br />
              <TryIcon />
              <Typography>{aiResponse}</Typography> 
            </p>
      </div>
    </PageLayout>
  );
};

export default TipsPage;
