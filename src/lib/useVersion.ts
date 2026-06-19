"use client";
import { useState, useEffect } from "react";

export function useVersion() {
  const [version, setVersion] = useState<string | null>(null);
  const [channel, setChannel] = useState<string>("alpha");

  useEffect(() => {
    fetch("https://api.github.com/repos/Preet3627/whatszara/releases/latest")
      .then(res => res.json())
      .then(data => {
        if (data.tag_name) {
          setVersion(data.tag_name.replace(/^v/, ""));
        }
      })
      .catch(() => {
        setVersion("0.1.0");
      });
  }, []);

  return { version, channel };
}
