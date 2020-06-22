function sign_generator(data: any) {
  const str = "abcdefghijklmnopqrstuvwxyz0123456789";
  const count = Math.floor(Math.random() * 7 + 10);
  let sign = "zza";
  for (let i = 0; i < count; i++) {
    sign += str[Math.floor(Math.random() * 36)];
  }
  return (sign += (window as any).__sign_hash_20200305(
    "CJBPACrRuNy7" + JSON.stringify(data)
  ));
}

export { sign_generator };
