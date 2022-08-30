{ pkgs }: {
	deps = [
		pkgs.imagemagick6_light
pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}