// import React from "react";
// import {
//   Html,
//   Head,
//   Body,
//   Container,
//   Heading,
//   Text,
//   Button,
//   Section,
// } from "@react-email/components";

// export default function WelcomeEmail({ firstName }: { firstName: string }) {
//   return (
//     <Html>
//       <Head />
//       <Body
//         style={{
//           backgroundColor: "#f4f4f4",
//           padding: "20px",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         <Container
//           style={{
//             backgroundColor: "#ffffff",
//             padding: "20px",
//             borderRadius: "8px",
//             textAlign: "center",
//           }}
//         >
//           <Container>
//             <Heading style={{ color: "#333", fontSize: "24px" }}>
//               Welcome to Our Store!
//             </Heading>
//           </Container>

//           <Text>{firstName}</Text>

//           <Text style={{ color: "#555", fontSize: "16px" }}>
//             Thank you for signing up! We're excited to have you on board. Please
//             note that you will need to use this email address when placing an
//             order.
//           </Text>

//           <Section style={{ margin: "20px 0" }}>
//             <Text style={{ fontSize: "14px", color: "#888" }}>
//               If you ever have questions, feel free to reach out to our support
//               team.
//             </Text>
//           </Section>

//           <Button
//             href="https://bigstores.nimaphuntsho.com/"
//             style={{
//               backgroundColor: "#007bff",
//               color: "#ffffff",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               textDecoration: "none",
//               fontSize: "16px",
//             }}
//           >
//             Start Shopping
//           </Button>

//           <Text style={{ fontSize: "12px", color: "#888", marginTop: "20px" }}>
//             If you didn’t sign up for this account, you can ignore this email.
//           </Text>
//         </Container>
//       </Body>
//     </Html>
//   );
// }
