import { UserInput } from "../routes/user";

class FieldError {
  error: {
    field: string;
    message: string;
  };
}

export const handleRegisterError = async (
  input: UserInput,
): Promise<FieldError | null> => {
  if (input.username.length < 3) {
    return {
      error: {
        field: "username",
        message: "username must be at least 3 char",
      },
    };
  }
  if (input.username.includes("@")) {
    return {
      error: {
        field: "username",
        message: "username must not include @",
      },
    };
  }
  if (input.email.length <= 2) {
    return {
      error: {
        field: "email",
        message: "email must be at least 3 char",
      },
    };
  }

  if (!input.email.includes("@")) {
    return {
      error: {
        field: "email",
        message: "email must include @",
      },
    };
  }

  if (input.password.length <= 2) {
    return {
      error: {
        field: "password",
        message: "password must be at least 3 char",
      },
    };
  }

  return null;
};
export const handleLoginError = async (
  input: UserInput,
): Promise<FieldError | null> => {
  if (input.username.length < 3) {
    return {
      error: {
        field: "username",
        message: "username must be at least 3 char",
      },
    };
  }
  if (input.username.includes("@")) {
    return {
      error: {
        field: "username",
        message: "username must not include @",
      },
    };
  }
  if (input.email.length <= 2) {
    return {
      error: {
        field: "email",
        message: "email must be at least 3 char",
      },
    };
  }

  if (!input.email.includes("@")) {
    return {
      error: {
        field: "email",
        message: "email must include @",
      },
    };
  }

  if (input.password.length <= 2) {
    return {
      error: {
        field: "password",
        message: "password must be at least 3 char",
      },
    };
  }

  return null;
};
