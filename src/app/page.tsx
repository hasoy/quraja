import Typography from "@/components/Typography";
import React from "react";

export default function Home() {
  return (
    <main>
      <Typography tag="h1">Quraja</Typography>
      <Typography tag="h2">Your quran memorize tracker and coach</Typography>
      <Typography tag="h3">Why use Quraja?</Typography>
      <Typography tag="p">
        Everyone who has started memorizing the Quran will know one thing:
      </Typography>
      <Typography tag="blockquote">
        &quot;Memorizing is easy, revision is the hard part&quot;
      </Typography>

      <Typography tag="p">
        Thus Quraja is focussed on making this process as easy for you as
        possible
      </Typography>
      <Typography tag="p">As the Hadith from Sahih Muslim states:</Typography>
      <Typography tag="blockquote">
        Keep refreshing your knowledge of the Quran, for I swear by Him in Whose
        Hand is the life of Muhammad that it is more liable to escape than
        camels which are hobbled.
        <a
          href="https://sunnah.com/muslim:791"
          className="underline text-blue-600"
        >
          link
        </a>
      </Typography>
      <br />

      <Typography tag="p">
        This is achieved by solving the following problems:
      </Typography>
      <ul>
        <li>Keeping track of what you memorized and when</li>
        <li>Being able to note which mistake you made where</li>
        <li>
          The algorithm will calculate what is most urgent to revise, ensuring
          you you use time wisely
        </li>
        <li>
          Keeps track of how much time you have per day and what is most optimal
          to do
        </li>
      </ul>
    </main>
  );
}
