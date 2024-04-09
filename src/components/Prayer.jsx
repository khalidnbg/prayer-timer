import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
export default function MediaCard({ name, time, image }) {
  return (
    <Card sx={{ width: "100%", marginTop: "50px", marginRight: "50px" }}>
      <CardMedia sx={{ height: 140 }} image={image} title="" />
      <CardContent>
        <h2>{name}</h2>

        <Typography variant="h3" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
