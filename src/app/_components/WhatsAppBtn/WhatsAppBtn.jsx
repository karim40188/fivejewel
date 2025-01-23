import Image from "next/image";
import Link from "next/link";
import React from "react";

function WhatsAppBtn() {
  return (
    <div
      className="fixed bottom-5 right-5 z-50 infinite-move"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60px",
        height: "60px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",

      }}
    >
      <Link
        href="https://wa.me/+966509557944" // ضع رقم الواتساب الخاص بك هنا
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width={35}
          height={35}
        />
      </Link>
    </div>
  );
}

export default WhatsAppBtn;
