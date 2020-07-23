type Id = string;
type Identifable<Type> = Type & { id: Id };

export { Id, Identifable };
