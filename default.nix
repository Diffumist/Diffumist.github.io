{ pkgs ? import <nixpkgs> {} }:
with pkgs;

pkgs.stdenv.mkDerivation rec {
  name = "gatsby-env";
  buildInputs = with pkgs; [
    nodejs-14_x
    (yarn.override {
      nodejs = nodejs-14_x;
    })
  ];
  shellHook = ''
  '';
}
