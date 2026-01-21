"use client";

export default function Map() {
    return (
        <iframe
            src="https://www.google.com/maps?q=Antananarivo Madagascar&z=16&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    );
}
