{ pkgs }: {
  deps = [
    pkgs.python39Full
    pkgs.nano
    pkgs.vim
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}