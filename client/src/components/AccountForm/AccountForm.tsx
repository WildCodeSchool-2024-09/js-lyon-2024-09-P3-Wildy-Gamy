import type { ReactNode } from "react";

type AccountData = {
  pseudo: string;
  email: string;
  image: string;
};

interface AccountFormProps {
  children: ReactNode;
  defaultValue: AccountData;
  onSubmit: (category: AccountData) => void;
}

function AccountForm({ children, defaultValue, onSubmit }: AccountFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const pseudo = formData.get("pseudo") as string;
        const email = formData.get("email") as string;
        const image = formData.get("image") as string;
        onSubmit({ pseudo, email, image });
      }}
    >
      <div className="form-container">
        <label htmlFor="pseudo">Pseudo</label>
        <input type="text" name="pseudo" defaultValue={defaultValue.pseudo} />
      </div>
      <div className="form-container">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" defaultValue={defaultValue.email} />
      </div>
      <div className="form-container">
        <label htmlFor="image">Image</label>
        <input type="text" name="image" defaultValue={defaultValue.image} />
      </div>
      <button className="submit-btn" type="submit">
        {children}
      </button>
    </form>
  );
}

export default AccountForm;
