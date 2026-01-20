"use client";
import { Check } from "lucide-react";

const ChatWelcomeScreen = () => {
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="w-full xxs:w-[80%] sm:w-md bg-snippetCardbox p-5 rounded-xl border border-white/10">
        <h3 className="font-inter text-center text-white text-lg">
          What would you like to ask?
        </h3>

        <p className="mt-2 text-center text-sm text-zinc-400">
          Snippet AI works best when you follow these rules
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          {[
            "Select a snippet before using AI.",
            "You can ask questions only about the selected snippet.",
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-zinc-300 font-inter"
            >
              <Check className="h-4 w-4 text-buttonColor shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChatWelcomeScreen;
