import {useContext, useEffect, useState } from "react";
import PageLayout from "../../components/Common/PageLayout";
import { askQuestion } from "../../queries/ai";
import { UserContext } from "../../context/UserContext";

const HomePage: React.FC = () => {
  const [aiResponse, setAiResponse] = useState<string>("");
  const {connectedUser } = useContext(UserContext);

  useEffect(() => {
    const fetchAiData = async () => {
      try {
        const accessToken = connectedUser?.accessToken;

        if (!accessToken) {
          console.log("No access token found");
          return;
        }

        const aiResponse = await askQuestion({question: 'What is the best food for weight loss?'}, accessToken);

        if (aiResponse.status === 200) {
          console.log("Query success");
          setAiResponse(aiResponse.data);
        }
      } catch (error) {
          console.log("error: ", error);
      } 
  };

  fetchAiData();
    
  }, []);

  return (
    <PageLayout>
          <h1>home page </h1>
          <h5>{aiResponse}</h5> 
    </PageLayout>
  );
};

export default HomePage;
