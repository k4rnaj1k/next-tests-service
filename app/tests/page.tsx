'use server'
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import { loadTestsData } from "../utils/tests";
import Link from "next/link";
import { countUser } from "@/app/utils/countUser";

export default async function Home() {
  const questionaireNames = await loadTestsData();
  await countUser();
  return (
    <main>
      <Container>
        <Typography pb={3} variant="h3" align="center">
          Оберіть тест який би хотіли пройти
        </Typography>
        <Grid container>
          {questionaireNames.map(questionaire =>
            <Grid key={questionaire.filename} item>
              <Card key={questionaire.questionaire_name} sx={{ maxWidth: '400px', marginRight: "15px" }}>
                <CardContent>
                  <Typography variant="h6">
                    {questionaire.questionaire_name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href={`/tests/${questionaire.filename}`} LinkComponent={Link}>Переглянути</Button>
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </main>
  );
}
